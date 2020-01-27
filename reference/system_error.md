# system_error
* system_error[meta header]
* cpp11[meta cpp]

`<system_error>`ヘッダでは、OSが出力するエラーを扱う機能を提供する。

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-----------------------------------------|-------|
| [`error_category`](system_error/error_category.md) | エラーを分類するための基底クラス(class) | C++11 |
| [`generic_category`](system_error/generic_category.md) | 汎用のエラーに関する情報を返す(function) | C++11 |
| [`system_category`](system_error/system_category.md) | 環境固有のエラーに関する情報を返す(function) | C++11 |
| [`error_code`](system_error/error_code.md) | 環境依�のエラーコード(class) | C++11 |
| [`error_condition`](system_error/error_condition.md) | 環境非依�のエラーコード(class) | C++11 |
| [`system_error`](system_error/system_error.md) | システムエラーの例外クラス(class) | C++11 |
| [`is_error_code_enum`](system_error/is_error_code_enum.md) | `error_code`の列挙値として見なせる型か判別する(class template) | C++11 |
| [`is_error_condition_enum`](system_error/is_error_condition_enum.md) | `error_condition`の列挙値として見なせる型か判別する(class template) | C++11 |
| [`errc`](system_error/errc.md) | エラー値を表す列挙型(enum class) | C++11 |
| [`make_error_code`](system_error/make_error_code.md) | `errc`から`error_code`オブジェクトを生成する(function) | C++11 |
| [`make_error_condition`](system_error/make_error_condition.md) | `errc`から`error_condition`オブジェクトを生成する(function) | C++11 |


## バージョン
### 言語
- C++11


## 参照
- [System error support in C++0x part1-5 - Thinking Asynchronously in C++](http://blog.think-async.com/search/label/system_error)
- [Boost System Library Documentation](http://www.boost.org/doc/libs/release/libs/system/doc/index.html)
- [N2241 Diagnostics Enhancements for C++0x (Rev. 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2241.html)
- [N2422 Diagnostics Issues (Rev. 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2422.htm)

