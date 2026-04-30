# exception
* meta[meta header]
* std::meta[meta namespace]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  class exception : public std::exception {
  public:
    exception(u8string_view msg, info from, std::source_location where = std::source_location::current());
    const char* what() const noexcept override;
    const char8_t* u8what() const noexcept;
    consteval info from() const;
    consteval std::source_location where() const;
  };
}
```
* info[link info.md]
* current()[link /reference/source_location/source_location/current.md]

## 概要
`exception`は、リフレクションのメタ関数がエラーを報告するために送出する例外クラスである。[`std::exception`](/reference/exception/exception.md)から派生する。

定数評価中にのみ送出・捕捉されるため、実行時のオーバーヘッドはない。

## メンバ関数

| 名前 | 説明 |
|------|------|
| `what()` | エラーメッセージを通常のエンコーディングで取得 |
| `u8what()` | エラーメッセージをUTF-8で取得 |
| `from()` | 送出元のメタ関数のリフレクションを取得 |
| `where()` | エラーが発生したソース位置を取得 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)
- [`std::exception`](/reference/exception/exception.md)


## 参照
- [P3560R2 Error Handling in Reflection](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3560r2.html)
