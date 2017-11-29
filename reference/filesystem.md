# filesystem
* filesystem[meta header]
* cpp17[meta cpp]

`<filesystem>`ヘッダは、OSのファイルシステムを操作するAPIを提供する。

このライブラリでは、ファイル、ディレクトリ、シンボリックリンクなどを操作する。また、それらを総称してエンティティと呼ぶ。


## パス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`path`](filesystem/path.md) | ファイルシステムのパスを扱うクラス (class) | C++17 |
| [`filesystem_error`](filesystem/filesystem_error.md.nolink) | ファイルシステム操作で起きたエラーを表す例外クラス (class) | C++17 |
| [`directory_entry`](filesystem/directory_entry.md.nolink) | ディレクトリエントリを表すクラス (class) | C++17 |
| [`directory_iterator`](filesystem/directory_iterator.md.nolink) | ディレクトリ内を走査するイテレータクラス (class) | C++17 |
| [`recursive_directory_iterator`](filesystem/recursive_directory_iterator.md.nolink) | ディレクトリ内を再帰的に走査するイテレータクラス (class) | C++17 |


## ファイルシステム情報

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`file_status`](filesystem/file_status.md.nolink) | ファイル状態を表すクラス (class) | C++17 |
| [`space_info`](filesystem/space_info.md.nolink) | ディスク容量を表すクラス (class) | C++17 |
| [`file_type`](filesystem/file_type.md.nolink) | ファイル種別を表す列挙型 (enum) | C++17 |
| [`perms`](filesystem/perms.md.nolink) | 権限を表す列挙型 (enum) | C++17 |
| [`perm_options`](filesystem/perm_options.md.nolink) | 権限オプションを表す列挙型 (enum) | C++17 |
| [`copy_options`](filesystem/copy_options.md.nolink) | コピーオプションを表す列挙型 (enum) | C++17 |
| [`directory_options`](filesystem/directory_options.md.nolink) | ディレクトリオプションを表す列挙型 (enum) | C++17 |
| `file_time_type` | ファイル情報で使用する時間の型 [`chrono::time_point`](/reference/chrono/time_point.md)`<実装定義のクロック型>;` | C++17 |


## ファイルシステム操作
### パス操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`current_path`](filesystem/current_path.md.nolink) | 現在の作業ディレクトリを取得・設定する (function) | C++17 |
| [`temp_directory_path`](filesystem/temp_directory_path.md.nolink) | 一時ディレクトリのパスを取得する (function) | C++17 |
| [`absolute`](filesystem/absolute.md.nolink) | パスを絶対パスに変換する (function) | C++17 |
| [`canonical`](filesystem/canonical.md.nolink) | パスを正規化する (function) | C++17 |
| [`weakly_canonical`](filesystem/weakly_canonical.md.nolink) | `canonical`よりも弱い要件でパスを正規化する (function) | C++17 |
| [`read_symlink`](filesystem/read_symlink.md.nolink) | シンボリックリンクが指すパスを取得する (function) | C++17 |
| [`relative`](filesystem/relative.md.nolink) | パスを現在の作業ディレクトリからの相対パスに変換する (function) | C++17 |
| [`proximate`](filesystem/proximate.md.nolink) | パスを現在の作業ディレクトリからの相対パスに変換する (function) | C++17 |


### エンティティ操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`copy`](filesystem/copy.md.nolink) | コピーする (function) | C++17 |
| [`copy_file`](filesystem/copy_file.md.nolink) | ファイルをコピーする (function) | C++17 |
| [`copy_symlink`](filesystem/copy_symlink.md.nolink) | シンボリックリンクをコピーする (function) | C++17 |
| [`create_directory`](filesystem/create_directory.md.nolink) | ディレクトリを作成する (function) | C++17 |
| [`create_directories`](filesystem/create_directories.md.nolink) | ディレクトリ階層を作成する (function) | C++17 |
| [`create_directory_symlink`](filesystem/create_directory_symlink.md.nolink) | ディレクトリのシンボリックリンクを作成する (function) | C++17 |
| [`create_hard_link`](filesystem/create_hard_link.md.nolink) | ハードリンクを作成する (function) | C++17 |
| [`create_symlink`](filesystem/create_symlink.md.nolink) | シンボリックリンクを作成する (function) | C++17 |
| [`permissions`](filesystem/permissions.md.nolink) | 権限を設定する (function) | C++17 |
| [`remove`](filesystem/remove.md.nolink) | エンティティを削除する (function) | C++17 |
| [`rename`](filesystem/remove.md.nolink) | エンティティを名称変更・移動する (function) | C++17 |
| [`resize_file`](filesystem/resize_file.md.nolink) | ファイルサイズを変更する (function) | C++17 |


### エンティティ情報

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`exists`](filesystem/exists.md.nolink) | パスが存在するか確認する (function) | C++17 |
| [`equivalent`](filesystem/equivalent.md.nolink) | 2つのエンティティが同等かを確認する (function) | C++17 |
| [`file_size`](filesystem/file_size.md.nolink) | ファイルサイズを取得する (function) | C++17 |
| [`hard_link_count`](filesystem/hard_link_count.md.nolink) | ハードリンク数を取得する (function) | C++17 |
| [`is_regular_file`](filesystem/is_regular_file.md.nolink) | 指定されたパスが通常ファイルを指しているかを確認する (function) | C++17 |
| [`is_directory`](filesystem/is_directory.md.nolink) | 指定されたパスがディレクトリを指しているかを確認する (function) | C++17 |
| [`is_symlink`](filesystem/is_symlink.md.nolink) | 指定されたパスがシンボリックリンクを指しているかを確認する (function) | C++17 |
| [`is_block_file`](filesystem/is_block_file.md.nolink) | 指定されたパスがブロックデバイスのスペシャルファイルを指しているかを確認する (function) | C++17 |
| [`is_character_file`](filesystem/is_character_file.md.nolink) | 指定されたパスがキャラクタデバイスのスペシャルファイルを指しているかを確認する (function) | C++17 |
| [`is_fifo`](filesystem/is_fifo.md.nolink) | 指定されたパスがFIFOもしくはパイプを指しているかを確認する (function) | C++17 |
| [`is_socket`](filesystem/is_socket.md.nolink) | 指定されたパスがソケットを指しているかを確認する (function) | C++17 |
| [`is_other`](filesystem/is_socket.md.nolink) | 指定されたパスが存在していない、もしくはシステム依存の種別のファイルを指しているかを確認する (function) | C++17 |
| [`last_write_time`](filesystem/last_write_time.md.nolink) | エンティティの最終更新日を取得・更新する (function) | C++17 |
| [`space`](filesystem/space.md.nolink) | 残り容量を取得する (function) | C++17 |
| [`status`](filesystem/status.md.nolink) | ファイル情報を取得する (function) | C++17 |
| [`symlink_status`](filesystem/status.md.nolink) | シンボリックリンクの情報を取得する (function) | C++17 |
| [`status_known`](filesystem/status_known.md.nolink) | ファイルが既知の状態かを確認する (function) | C++17 |


## バージョン
### 言語
- C++17

## 参照
- [P0218R1 Adopt the File System TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0218r1.html)
- [P0219R1 Relative Paths for Filesystem](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0219r1.html)

