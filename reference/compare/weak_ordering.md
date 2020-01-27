# weak_ordering
* compare[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  class weak_ordering {
    int value;  //説明専用メンバ変数

    constexpr explicit weak_ordering(int v) noexcept : value(v) {}  //説明専用コンストラクタ

  public:

    static const weak_ordering less;
    static const weak_ordering equivalent;
    static const weak_ordering greater;
  };

  //静的メンバ定数の定義（初期化している値は説明のためのもの）
  inline constexpr weak_ordering weak_ordering::less(-1);
  inline constexpr weak_ordering weak_ordering::equivalent(0);
  inline constexpr weak_ordering weak_ordering::greater(1);
}
```

## 概要

`weak_ordering`は`<=>`の戻り値型として利用される比較カテゴリ型の一つであり、その比較が弱順序の要件を満たしている事を表明する。

上記の説明専用のメンバ変数やコンストラクタは実際に実装されるものではなく、各定数の初期化時の値もあくまで説明専用のものである。これらに依�したプ�グラムにならないように注意が必要である。

## 静的メンバ定数

比較カテゴリ型はコンストラクタの提供が規定されていないため、その値は静的メンバ定数から取得する必要がある。

| 名前         | 説明                                                | 対応バージョン |
| ------------ | --------------------------------------------------- | -------------- |
| `less`       | `a <=> b`の比較結果が`a < b`である事を表す値        | C++20          |
| `equivalent` | `a <=> b`比較結果が�価（`a == b`）である事を表す値 | C++20          |
| `greater`    | `a <=> b`の比較結果が`a > b`である事を表す値        | C++20          |

## メンバ関数

### 比較カテゴリ型への暗黙変換

| 名前                                                                         | 説明                                                      | 対応バージョン |
| ---------------------------------------------------------------------------- | --------------------------------------------------------- | -------------- |
| [`oeprator partial_ordering`](weak_ordering/op_partial_ordering.md) | [`partial_ordering`](partial_ordering.md)への型変換演算� | C++20          |


### 比較演算�

| 名前                                       | 説明                             | 対応バージョン |
| ------------------------------------------ | -------------------------------- | -------------- |
| [`operator==`](weak_ordering/op_equal.md)         | �値比較                         | C++20          |
| [`operator!=`](weak_ordering/op_not_equal.md)     | 非�値比較 (`==`により使用可能)                       | C++20          |
| [`operator<`](weak_ordering/op_less.md)           | 左辺が右辺より小さいかを判定する | C++20          |
| [`operator<=`](weak_ordering/op_less_equal.md)    | 左辺が右辺以下かを判定する       | C++20          |
| [`operator>`](weak_ordering/op_greater.md)        | 左辺が右辺より大きいかを判定する | C++20          |
| [`operator>=`](weak_ordering/op_greater_equal.md) | 左辺が右辺以上かを判定する       | C++20          |
| [`operator<=>`](weak_ordering/op_compare_3way.md) | 三方比較                         | C++20          |


## weak_orderingによるカスタム比較実装例

```cpp example
#include <iostream>
#include <string>
#include <compare>
#include <cctype>

struct insensitive_string {
  std::string str;

  auto operator<=>(const insensitive_string& that) const -> std::weak_ordering {
    //大文�小文�を同値として扱って比較

    std::size_t length = std::min(str.length(), that.str.length());

    for (std::size_t i = 0; i < length; ++i) {
      char c1, c2;
      if (std::isalpha(static_cast<unsigned char>(str[i])) && std::isalpha(static_cast<unsigned char>(that.str[i]))) {
        c1 = std::tolower(str[i]);
        c2 = std::tolower(that.str[i]);
      } else {
        c1 = str[i];
        c2 = that.str[i];
      }
      if (auto comp = c1 <=> c2; comp != 0) return comp;
    }

    return str.length() <=> that.str.length();
  }

  //素の文�列との比較
  auto operator<=>(const char* other) const -> std::weak_ordering {
    return *this <=> insensitive_string{other};
  }

};

int main()
{
  insensitive_string str1 = {"spaceship"}, str2 = {"SPACESHIP"};

  std::cout << std::boolalpha;
  std::cout << (str1 <  str2) << std::endl;
  std::cout << (str1 <= str2) << std::endl;
  std::cout << (str1 >  str2) << std::endl;
  std::cout << (str1 >= str2) << std::endl;

  std::cout << "\n";

  const char* str3 = "Three-way";

  std::cout << (str1 <  str3) << std::endl;
  std::cout << (str1 <= str3) << std::endl;
  std::cout << (str1 >  str3) << std::endl;
  std::cout << (str1 >= str3) << std::endl;

  std::cout << "\n";

  //異種型間比較時の逆順の演算�の導出
  std::cout << (str3 <  str1) << std::endl;
  std::cout << (str3 <= str1) << std::endl;
  std::cout << (str3 >  str1) << std::endl;
  std::cout << (str3 >= str1) << std::endl;
}
```
* weak_ordering[color ff0000]

### 出力
```
false
true
false
true

true
true
false
false

false
false
true
true
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019

## 関連項目

- [C++20 一貫比較](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0515R3 Consistent comparison](http://wg21.link/p0515)
- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
