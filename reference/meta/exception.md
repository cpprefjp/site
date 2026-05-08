# exception
* meta[meta header]
* std::meta[meta namespace]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  class exception : public std::exception {
  public:
    consteval exception(std::u8string_view what, info from,
                        std::source_location where = std::source_location::current()) noexcept;

    consteval exception(std::string_view what, info from,
                        std::source_location where = std::source_location::current()) noexcept;

    exception(const exception&) = default;
    exception(exception&&) = default;

    exception& operator=(const exception&) = default;
    exception& operator=(exception&&) = default;

    consteval const char* what() const noexcept override;
    consteval std::u8string_view u8what() const noexcept;
    consteval info from() const noexcept;
    consteval std::source_location where() const noexcept;
  };
}
```
* info[link info.md]
* current()[link /reference/source_location/source_location/current.md]

## 概要
`exception`は、リフレクションのメタ関数がエラーを報告するために送出する例外クラスである。[`std::exception`](/reference/exception/exception.md)から派生する。

定数評価中にのみ送出・捕捉されるため、実行時のオーバーヘッドはない。consteval-only型であり、実行時には存在できない。

## メンバ関数

| 名前 | 説明 |
|------|------|
| `(constructor)` | `u8string_view`または`string_view`のメッセージ、送出元のリフレクション、ソース位置からオブジェクトを構築する |
| `what()` | エラーメッセージを通常のエンコーディングで取得 |
| `u8what()` | エラーメッセージをUTF-8（[`u8string_view`](/reference/string_view/basic_string_view.md)）で取得 |
| `from()` | 送出元のメタ関数のリフレクションを取得 |
| `where()` | エラーが発生したソース位置を取得 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)
- [`std::exception`](/reference/exception/exception.md)


## 参照
- [P3560R2 Error Handling in Reflection](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3560r2.html)
- [LWG Issue 4513. `meta::exception::what()` should be `consteval`](https://cplusplus.github.io/LWG/issue4513)