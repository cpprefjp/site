# 参照するPOSIX規格を更新
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++20まではPOSIX規格としてISO/IEC 9945:2003 (別名POSIX.1-2001 aka The Single UNIX Specification, version 3) を参照していた。

しかし、標準C++の一部の機能はより新しいPOSIX規格の機能を使用していたため、ISO/IEC 9945:2003への参照を削除した上で、以下の3つの規格を参照するよう変更する：

1. ISO/IEC/IEEE 9945:20032009, Information Technology — Portable Operating System Interface (POSIX)
2. ISO/IEC/IEEE 9945:2009/Cor 1:2013, Information Technology — Portable Operating System Interface (POSIX), Technical Corrigendum 1
3. ISO/IEC/IEEE 9945:2009/Cor 2:2017, Information Technology — Portable Operating System Interface (POSIX), Technical Corrigendum 2

`posix`名前空間の予約に関してのPOSIX規格の参照もまた、ISO/IEC 9945からISO/IEC/IEEE 9945に変更する。

また、POSIXの一部環境で非推奨となっている機能である`readdir_r()`を参照していたところを、`readdir()`に置き換える。


## この機能が必要になった背景・経緯
ここでは、具体的に問題になった、標準C++が参照するPOSIXの機能を列挙する。

### errno
C++03まで、[`<cerrno>`](/reference/cerrno.md)と`<errno.h>`にはISO Cが要求する`EDOM` (定義域エラー)、`ERANGE` (値域エラー)、`errno`といった必要最低限のマクロのみが含まれていた。

C++11での[`<system_error>`](/reference/system_error.md)ライブラリの導入にともなって、「[`<cerrno>`](/reference/cerrno.md)で定義される内容は、`errno`がマクロ定義されることを除いてPOSIXの`<errno.h>`ヘッダと同じである」という規定となった。この規定のあとにマクロのリストが定義されるが、`ENOTRECOVERABLE`と`EOWNERDEAD`はPOSIXの2006規格、`ENOTSUP`と`EOPNOTSUPP`は2008規格で追加されたものだった。

POSIXの2008年では標準C++で定義されるマクロのほかに`EDQUOT`、`EMULTIHOP`、`ENOLINK`といった具体的な意味をもたない「予約済み」というだけのマクロももっている。すでに定義されている`ESTALE`のようにそれらを標準C++に追加することは今後検討する必要はあるが、ここでは提案しない。


### ファイルシステム
[`path`](/reference/filesystem/path.md)クラスについて、POSIX.1-2008の4.12 Pathname ResolutionとPOSIX.1-2017の4.13 Pathname Resolutionを追加で参照する必要がある。

ここで参照するほとんどの機能はPOSIX.1-2001に存在するが、ファイルの最終更新日時の`futimens()`関数、ファイル権限の`fchmodat()`関数は存在していない。

`truncate()`と`statvfs()`の機能はオプションであり、POSIXに準拠する環境に存在する必要がない。POSIX.1-2008ではこれらの機能がオプションではなくなった。

`stat()`で使用される`S_ISVTX`マクロはオプション機能であり、XSIの一部である。これはPOSIX.1-2008とPOSIX.1-2017でもオプションのままである。

POSIX.1-2001のスレッドセーフ関数 (Thread-Safe Functions : TSF) オプションの一部である`readdir_r()`を参照する注記もあるが、POSIX.1-2008ではBaseに移動されている。ただし、`readdir_r()` APIの実装には欠陥があり、一部の実装では非推奨となっており、将来のバージョンから削除される可能性がある。ここでは`readdir_r()`に固有のものに依存してはいないため、`readdir()`を参照するよう変更する。


## 参照
- [P2227R0 Update normative reference to POSIX](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2227r0.html)