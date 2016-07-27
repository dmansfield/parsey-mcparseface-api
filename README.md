_This is a WIP!_

This project creates a TF Serving API server to serve the excellent Google Parsey McParseface Tensorflow Model.

The upstream project for that model is:

https://github.com/tensorflow/models/tree/master/syntaxnet

However, some modifications to make it usable within TF Serving are in my fork:

https://github.com/dmansfield/models/tree/documents-from-tensor

## Project Setup and Build

I don't much like submodules, and anyway the various projects involved (tensorflow, tensorflow serving and tensorflow models) have conflicting submodule revisions.

Here are my build steps:
```
# gcc 6.1.1 on Fedora 24, bazel 0.3.0
cd /some/path
mkdir api
cd api
pwd # This is the $BASE referenced below
git clone https://github.com/tensorflow/tensorflow.git
git clone https://github.com/dmansfield/models.git
git clone https://github.com/dmansfield/parsey-mcparseface-api.git
git clone https://github.com/tensorflow/serving.git
cd tensorflow
./configure
```
Answer the questions.
```
cd ../models
git checkout documents-from-tensor
cd syntaxnet
rm -rf tensorflow
ln -s ../../tensorflow .
cd ../../serving
rm -rf tensorflow tf_models
ln -s ../tensorflow
ln -s ../models .
cd ../parsey-mcparseface-api
vi WORKSPACE
```
Now edit the tf_workspace hardcoded path (line 19) to point to the `$BASE/tensorflow` directory. And then you can start the build, which takes about 20 minutes on my system. 
```
bazel build -c opt parsey_api/...

```

Then run it:
```
./bazel-bin/parsey_api/parsey_api --port=9000 parsey_model
```
For the client, setup is easy:
```
# node 6.2.0 installed using nvm
cd parsey_client
npm install
```

Run it with the client (note: the server address 127.0.0.1:9000 is hard-coded into the client.  Edit as necessary.
```
cd parsey_client
node index.js
```

Good luck and feel free to ask questions via github.

I've included an exported model in the parsey_model/ directory.

To recreate this, you must use the parsey_mcparseface.py script in the tensorflow models fork. To run that, you'll need to fudge the PYTHONPATH. I'm no expert on a great way to do that, I currently end up pointing to something horrible underneath the bazel cache like (fix to your .cache):
```
 export PYTHONPATH=.../.cache/bazel/_bazel_root/235fbe2e0db6dc63104db4cf913de6ec/execroot/serving/bazel-out/local-fastbuild/bin/tensorflow_serving/session_bundle/session_bundle_py_test.runfiles/tf_serving/
```
Someone can help me here?

## Issues
- Host and port are hardcoded in nodejs client.

- Assets that are loaded by the module are loaded based on CWD of serving process, and are required in "syntaxnet/models/parsey_mcparseface" directory, even though they are not probably located there.  Current solution is to use a symlink.

- It seems to not be threadsafe.  If multiple requests are submitted simultaneously it crashes.