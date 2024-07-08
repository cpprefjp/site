# throw()による例外送出しない指定を削除
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<!-- last lang caution -->

## 概要
C++11で例外送出しないことを指定する[`noexcept`](/lang/cpp11/noexcept.md)が追加されたことによって古い例外仕様は非推奨化の後に削除されたが、なにも例外送出しないことを表す`throw()`指定は`noexcept`と同じ意味になるよう仕様が変更されて非推奨機能として維持されていた。

```cpp
void f() throw();
// 以下と同じ意味
// void f() noexcept;
```

C++20では、非推奨とされていた`throw()`指定の機能を削除する。代わりに`noexcept`を使用すること。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 noexcept](/lang/cpp11/noexcept.md)
- [C++17 非推奨だった古い例外仕様を削除](/lang/cpp17/remove_deprecated_exception_specifications.md)


## 参照
- [P0619R4 Reviewing Deprecated Facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)