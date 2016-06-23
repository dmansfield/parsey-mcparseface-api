load("@tf_serving//tensorflow_serving:serving.bzl", "serving_proto_library")

serving_proto_library(
    name = "parsey_api_proto",
    srcs = ["parsey_api.proto"],
    deps = [
	"@syntaxnet//syntaxnet:sentence_proto",
    ],
    has_services = 1,
    cc_api_version = 2,
    cc_grpc_version = 1,
)

cc_binary(
    name = "parsey_api",
    srcs = [
        "parsey_api.cc",
    ],
    linkopts = ["-lm"],
    deps = [
        "@grpc//:grpc++",
        "@org_tensorflow//tensorflow/core:core_cpu",
        "@org_tensorflow//tensorflow/core:framework",
        "@org_tensorflow//tensorflow/core:lib",
        "@org_tensorflow//tensorflow/core:protos_all_cc",
        "@org_tensorflow//tensorflow/core:tensorflow",
    	"@syntaxnet//syntaxnet:parser_ops_cc",
	"@syntaxnet//syntaxnet:sentence_proto",
        ":parsey_api_proto",
        "@tf_serving//tensorflow_serving/servables/tensorflow:session_bundle_config_proto",
        "@tf_serving//tensorflow_serving/servables/tensorflow:session_bundle_factory",
        "@tf_serving//tensorflow_serving/session_bundle",
        "@tf_serving//tensorflow_serving/session_bundle:manifest_proto",
        "@tf_serving//tensorflow_serving/session_bundle:signature",
    ],
)

