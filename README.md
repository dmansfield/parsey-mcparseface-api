_This is a WIP!_

This project creates a TF Serving API server to serve the excellent Google Parsey McParseface Tensorflow Model.

The upstream project for that model is:

https://github.com/tensorflow/models/tree/master/syntaxnet

However, some modifications to make it usable within TF Serving are in my fork:

https://github.com/dmansfield/models/tree/documents-from-tensor

## Project Setup

I don't much like submodules, and anyway the various projects involved (tensorflow, tensorflow serving and tensorflow models) have conflicting submodule revisions.

Start by checking out tensorflow from github (https://github.com/tensorflow/tensorflow, master as of today is 0cf6daff66ff2d3c35defb07d1fc5100c37fefb3).

Now checkout (in a parallel directory) tensorflow models from my fork (https://github.com/tensorflow/models, master as of today is 2a7f1c36d0e390ed289e0eeec14e1b46d11f0511).

Within the models/syntaxnet directory, get rid of the tensorflow submodule and create a symlink to tensorflow checked out above.

Now checkout (in a parallel directory) tensorflow serving (https://github.com/tensorflow/serving, head as of today is 7bbed91fa41688011e74f720f15e1cbf6bce6e33). As above, you must remove the submodules for "tensorflow" and "tf_models". Use the two already checkout out projcets.

In this project:
```
 bazel build --nocheck_visibility parsey_api/... 
```
Then run it:
```
 ./bazel-bin/parsey_api/parsey_api --port=9000 parsey_model
```
And test it with the client:
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
- Host and port are hardcoded in nodejs client. I use docker so that's where it's pointing.

- Assets that are loaded by the module are loaded based on CWD of serving process, and are required in "syntaxnet/models/parsey_mcparseface" directory, even though they are not probably located there.  Current solution is to use a symlink.

- It seems to not be threadsafe.  If multiple requests are submitted simultaneously it crashes.