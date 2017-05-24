# 非推奨だった古い例外仕様を削除
* cpp17[meta cpp]

## 概要
C++11で[`noexcept`](/lang/cpp11/noexcept.md)機能が入ったことにより、従来の`throw`キーワードを使用した「例外仕様 (Exception Specification)」は「動的例外仕様 (Dynamic Exception Specification)」という名前に変更され、非推奨となっていた。

```cpp
// 動的例外仕様を使用したコード。
// C++11から非推奨、C++17ではコンパイルエラーとなる。
void f() throw(std::runtime_error);
```

C++17ではこの動的例外仕様が削除される。以降は、noexcept例外仕様を使用すること。

```cpp
// C++11で導入されたnoexcept例外仕様を使用したコード。
// noexceptおよびnoexcept(true)は、「この関数からは例外を送出しない」という宣言。
// noexcept(false)およびnoexceptを付けないことは「この関数からは例外を送出する可能性がある」という宣言。
void f() noexcept;
void f() noexcept(true);
void f() noexcept(false);
void f();
```

動的例外仕様は「指定された例外以外が送出された場合、[`std::unexpected()`](/reference/exception/unexpected.md)関数が呼び出されるが、noexcept例外仕様では即座に[`std::terminate()`](/reference/exception/terminate.md)関数が呼び出され、プログラムが異常終了する。

`void f() throw();`という「この関数は例外を送出しない」指定については、C++17から`noexcept`を指定したものと同じ意味論に変更され、非推奨の機能として維持される。非推奨の機能ではあるため、削除までの猶予期間の間に`noexcept`例外仕様への移行が必要となる。
また、動的例外仕様に関連したライブラリ機能として、非推奨となっていた以下の機能も削除される：

- [`std::unexpected()`](/reference/exception/unexpected.md)関数
- [`std::set_unexpected()`](/reference/exception/set_unexpected.md)関数
- [`std::get_unexpected()`](/reference/exception/get_unexpected.md)関数
- [`std::unexpected_handler`](/reference/exception/set_unexpected.md)型

関連機能として[`std::bad_exception`](/reference/exception/bad_exception.md)例外型もあるが、この機能は[`std::current_exception()`](/reference/exception/current_exception.md)関数から参照されるものとして残る。


## この機能を削除するに至った背景・経緯
動的例外仕様はJavaの「検査例外 (checked exception)」機能と近い機能ではあるが、これらには共通の問題がある。それは、オブジェクト指向プログラミングやジェネリックプログラミングとの相性が悪いということである。

オブジェクト指向プログラミングとの相性が悪いというのは、動的例外仕様を使用してオブジェクト指向プログラミングにおける「開放閉鎖原則 (open/closed principle)」を適用するのが難しいことにある。開放閉鎖原則は「拡張に対して開いていて、修正に対して閉じていなければならない」というものである。仮想関数に対して動的例外仕様を使用して送出される例外型を制限した場合、派生クラスでオーバーライドした仮想関数は、起こりうるエラーの種類に過度な制限を受けてしまう。これはたとえばリソースを読み込むクラス・関数を設計した場合、基本クラスでは「読み込みエラー」くらいしか起こりうるエラーの種類を規定できないが、派生クラスでは「ファイルからの読み込みに失敗」や「ネットワークの接続に失敗」といった起こりうるエラーの種類が増える、といった状況に対応できない。

ジェネリックプログラミングとの相性が悪いというのは、パラメータ化された型によって起こりうるエラーに差異が出るため、起こりうるエラーを列挙することが困難であるという問題である。

C++固有の問題としては、以下のような問題があった：

- 例外型の検査が実行時に行われるために、プログラマが動作を保証できず、回復にも役に立たない。また、実行時の検査であるために、コンパイラは最適化を妨げるコードを生成せざるをえなかった

これらの問題があるため、C++とJavaの後発であるC#では、動的例外仕様や検査例外に類する機能は提供されなかった。

- [The Trouble with Checked Exceptions (検査例外でのトラブル)](http://www.artima.com/intv/handcuffsP.html)
    - C#設計者であるAnders Hejlsbergへのインタビュー

C++でもJavaを含むこれらの問題は認識されており、動的例外仕様の代わりとなるnoexcept例外仕様が新設された。代わりの機能ができたことで動的例外仕様は非推奨となり、noexcept例外仕様への移行する猶予期間が設けられた後、C++17でこの機能が削除されることとなった。


## 関連項目
- [C++11 noexcept](/lang/cpp11/noexcept.md)


## 参照
- [P0003R4 Removing Deprecated Exception Specifications from C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0003r4.html)
