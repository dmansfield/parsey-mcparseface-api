workspace(name = "cali_nlp")

local_repository(
  name = "org_tensorflow",
  path = __workspace_dir__ + "/../tensorflow",
)

local_repository(
  name = "syntaxnet",
  path = __workspace_dir__ + "/../models/syntaxnet",
)

local_repository(
  name = "tf_serving",
  path = __workspace_dir__ + "/../serving",
)

load('@org_tensorflow//tensorflow:workspace.bzl', 'tf_workspace')
tf_workspace("/opt/tensorflow/tensorflow/", "@org_tensorflow")

# ===== gRPC dependencies =====

bind(
    name = "libssl",
    actual = "@boringssl_git//:ssl",
)

bind(
    name = "zlib",
    actual = "@zlib_archive//:zlib",
)
