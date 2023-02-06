# コンストラクタ
* format[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_format_string[meta class]
* cpp23[meta cpp]

```cpp
template <class T>
consteval basic_format_string(const T& s);
```

## 概要
`basic_format_string`オブジェクトを構築する。


## テンプレートパラメータ制約
- `const T&`は[`convertible_to`](/reference/concepts/convertible_to.md)`<`[`basic_string_view`](/reference/string_view/basic_string_view.md)`<charT>>`のモデルであること


## 効果
メンバ変数として`basic_string_view<charT> str;`が定義されるとして、`str(s)`で初期化する。


## 備考
- この関数の呼び出しは、`str`が`args`の書式文字列であるような`Args`型の`args`が存在しない限り、コア定数式ではない
    - 意味 : 書式文字列が引数列`args`と合わせて正しくなければ、定数式評価 (`consteval`) が実行できずコンパイルエラーとなる
    - 以下のようなコードはコンパイルエラーとなる：
    ```cpp
    int main() {
      auto str = std::format("{:d}", "I am not a number"); // コンパイルエラー！型が合わない
    }
    ```
    * std::format[link /reference/format/format.md]


## 実装例
```cpp
// 書式文字列のチェック
template <class CharT, class... Args>
consteval void fmt_checker(std::basic_string_view<CharT> str)
{
  // …

  if (/*カッコの開き・閉じが一致しない場合*/) {
    throw "invalid brackets"; // throw式は定数式で実行できないため、
                              // このパスを通ったらコンパイルエラーになる
  }

  // …

  if (/*型が合わない時*/) {
    throw "invalid type specifier";
  }

  // …
}

namespace std {
  template <class CharT, class... Args>
  struct basic_format_string {
    std::basic_string_view<CharT> str;

    template <class T>
      requires std::convertible_to<const T&, std::basic_string_view<charT>>
    consteval basic_format_string(const T& s)
      : str(s)
    {
      fmt_checker<CharT, Args...>(str);
    }
  };

  template <class... Args>
  using format_string = basic_format_string<char, std::type_identity_t<Args>...>;
}
```
* std::convertible_to[link /reference/concepts/convertible_to.md]
* std::type_identity_t[link /reference/type_traits/type_identity.md]


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2216R3 `std::format` improvements](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2216r3.html)
