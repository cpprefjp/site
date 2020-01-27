# errc
* system_error[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  enum class errc;
}
```

`errc`列挙型は、[`<cerrno>`](/reference/cerrno.md)ヘッダが提供するPOSIXエラーのマク�に対応する列挙値を定義する。

この値は、[`error_code`](error_code.md)/[`error_condition`](error_condition.md)に�定する[`generic_category()`](generic_category.md)カテゴリのエラー値として使用される。


| 列挙値                               | 値                | 説明                                     |
|--------------------------------------|-------------------|------------------------------------------|
| `address_family_not_supported`       | `EAFNOSUPPORT`    | アドレスファミリーがサポートされていない |
| `address_in_use`                     | `EADDRINUSE`      | アドレスがすでに使用されている |
| `address_not_available`              | `EADDRNOTAVAIL`   | アドレスが使用できない |
| `already_connected`                  | `EISCONN`         | ソケットが接続されている |
| `argument_list_too_long`             | `E2BIG`           | 引数リストが長すぎる |
| `argument_out_of_domain`             | `EDOM`            | 引数が領域外 |
| `bad_address`                        | `EFAULT`          | アドレスが不� |
| `bad_file_descriptor`                | `EBADF`           | ファイルディスクリプタが不� |
| `bad_message`                        | `EBADMSG`         | メッセージが不� |
| `broken_pipe`                        | `EPIPE`           | パイプが壊れている |
| `connection_aborted`                 | `ECONNABORTED`    | 接続が��された |
| `connection_already_in_progress`     | `EALREADY`        | 接続がすでに処理� |
| `connection_refused`                 | `ECONNREFUSED`    | 接続が拒否された |
| `connection_reset`                   | `ECONNRESET`      | 接続がリセットされた |
| `cross_device_link`                  | `EXDEV`           | 不適切なリンク |
| `destination_address_required`       | `EDESTADDRREQ`    | 宛先アドレスが必要 |
| `device_or_resource_busy`            | `EBUSY`           | リソースが使用� |
| `directory_not_empty`                | `ENOTEMPTY`       | ディレクトリが空ではない |
| `executable_format_error`            | `ENOEXEC`         | 実行ファイル形式のエラー |
| `file_exists`                        | `EEXIST`          | ファイルが�在する |
| `file_too_large`                     | `EFBIG`           | ファイルが大きすぎる |
| `filename_too_long`                  | `ENAMETOOLONG`    | ファイル名が長すぎる |
| `function_not_supported`             | `ENOSYS`          | 関数がサポートされていない(実装されていない) |
| `host_unreachable`                   | `EHOSTUNREACH`    | ホストに到達不能 |
| `identifier_removed`                 | `EIDRM`           | �別�が削除された |
| `illegal_byte_sequence`              | `EILSEQ`          | 不�なバイト列 |
| `inappropriate_io_control_operation` | `ENOTTY`          | I/O制御操作が不適切 |
| `interrupted`                        | `EINTR`           | 関数呼び出しが割り込まれた |
| `invalid_argument`                   | `EINVAL`          | 引数が無効 |
| `invalid_seek`                       | `ESPIPE`          | 無効なシーク |
| `io_error`                           | `EIO`             | I/Oエラー |
| `is_a_directory`                     | `EISDIR`          | ディレクトリである |
| `message_size`                       | `EMSGSIZE`        | メッセージが長すぎる |
| `network_down`                       | `ENETDOWN`        | ネットワークが不通 |
| `network_reset`                      | `ENETRESET`       | 接続がネットワーク側から��された |
| `network_unreachable`                | `ENETUNREACH`     | ネットワークが到達不能である |
| `no_buffer_space`                    | `ENOBUFS`         | 使用可能なバッファ空間がない |
| `no_child_process`                   | `ECHILD`          | �プ�セスがない |
| `no_link`                            | `ENOLINK`         | リンクが切れている |
| `no_lock_available`                  | `ENOLCK`          | 利用できる�ックがない |
| `no_message_available`               | `ENODATA`         | ストリームの�み出し�ューの先�に�み出し可能なメッセージがない |
| `no_message`                         | `ENOMSG`          | 要求された型のメッセージがない |
| `no_protocol_option`                 | `ENOPROTOOPT`     | 指定されたプ�トコルが利用できない |
| `no_space_on_device`                 | `ENOSPC`          | デバイスに空き領域がない |
| `no_stream_resources`                | `ENOSR`           | 指定されたストリームリソースがない |
| `no_such_device_or_address`          | `ENXIO`           | そのようなデバイスやアドレスはない |
| `no_such_device`                     | `ENODEV`          | そのようなデバイスはない |
| `no_such_file_or_directory`          | `ENOENT`          | そのようなファイルやディレクトリはない |
| `no_such_process`                    | `ESRCH`           | そのようなプ�セスはない |
| `not_a_directory`                    | `ENOTDIR`         | ディレクトリではない |
| `not_a_socket`                       | `ENOTSOCK`        | ソケットではない |
| `not_a_stream`                       | `ENOSTR`          | ストリームではない |
| `not_connected`                      | `ENOTCONN`        | ソケットが接続されていない |
| `not_enough_memory`                  | `ENOMEM`          | メモリ領域に十分な空きがない |
| `not_supported`                      | `ENOTSUP`         | 操作がサポートされていない |
| `operation_canceled`                 | `ECANCELED`       | 操作が�ャンセルされた |
| `operation_in_progress`              | `EINPROGRESS`     | 操作が実行�である |
| `operation_not_permitted`            | `EPERM`           | 操作が許可されていない |
| `operation_not_supported`            | `EOPNOTSUPP`      | ソケットでサポートされていない操作 |
| `operation_would_block`              | `EWOULDBLOCK`     | 操作がブ�ッ�ングされる見込み |
| `owner_dead`                         | `EOWNERDEAD`      | ミューテックスを所有している間に終了した |
| `permission_denied`                  | `EACCES`          | 許可されていない |
| `protocol_error`                     | `EPROTO`          | プ�トコルエラー |
| `protocol_not_supported`             | `EPROTONOSUPPORT` | プ�トコルがサポートされていない |
| `read_only_file_system`              | `EROFS`           | ファイルシステムが�み取り専用 |
| `resource_deadlock_would_occur`      | `EDEADLK`         | リソースのデッド�ックを回避した |
| `resource_unavailable_try_again`     | `EAGAIN`          | リソースが一時的に利用不可 |
| `result_out_of_range`                | `ERANGE`          | 結果が大きすぎる |
| `state_not_recoverable`              | `ENOTRECOVERABLE` | �ックが回復不能 |
| `stream_timeout`                     | `ETIME`           | タイムアウト |
| `text_file_busy`                     | `ETXTBSY`         | テ�ストファイルが使用� |
| `timed_out`                          | `ETIMEDOUT`       | 操作がタイムアウト |
| `too_many_files_open_in_system`      | `ENFILE`          | システム全体で開いているファイルが多すぎる |
| `too_many_files_open`                | `EMFILE`          | 開いているファイルが多すぎる |
| `too_many_links`                     | `EMLINK`          | リンクが多すぎる |
| `too_many_symbolic_link_levels`      | `ELOOP`           | シンボリックリンクが多すぎる |
| `value_too_large`                    | `EOVERFLOW`       | データ型に対して値が大きすぎる |
| `wrong_protocol_type`                | `EPROTOTYPE`      | ソケットに指定できないプ�トコルタイプ |


## 参照
- [Man page of ERRNO](http://linuxjm.osdn.jp/html/LDP_man-pages/man3/errno.3.html)

