# monostate
* variant[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  struct monostate {};
}
```

## 概要
`monostate`は、[`variant`](variant.md)に空の状態を持たせるための空のクラスである。

[`variant`](variant.md)は、候補型のうち0番目の型の値をデフォルトで保持する。そのため、エラーによって空になることはあっても、通常の操作として「空」を表現できない。

[`variant`](variant.md)の候補型として`monostate`を指定し、そのオブジェクトを保持させることで、擬似的に空の状態を表現できる。候補型の0番目に`monostate`を指定することで、[`variant`](variant.md)のデフォルト構築状態を空にできる。


### 備考
- `monostate`は、唯一の状態としてデフォルト構築状態をもつことを意味する
- [Boost Variant Library](https://boost.org/libs/variant)では、これと等価な型が`blank`という名前で定義される


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `monostate() = default;` | コンストラクタ | C++17 |
| `~monostate() = default;` | デストラクタ | C++17 |
| `monostate& operator=(const monostate&) = default;`<br/> `monostate& operator=(monostate&&) = default;` | 代入演算子 | C++17 |


## 非メンバ関数
### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `constexpr bool operator==(monostate, monostate) noexcept;` | 等値比較。`true`を返す | C++17 |
| `constexpr bool operator!=(monostate, monostate) noexcept;` | 非等値比較。`false`を返す (C++20から`==`により使用可能) | C++17 |
| `constexpr strong_ordering operator<=>(monostate, monostate) noexcept;` | 三方比較。`strong_ordering::equal`を返す | C++20 |
| `constexpr bool operator<(monostate, monostate) noexcept;`  | 左辺が右辺より小さいかを判定する。`false`を返す (C++20から`<=>`により使用可能) | C++17 |
| `constexpr bool operator<=(monostate, monostate) noexcept;` | 左辺が右辺以下かを判定する。`true`を返す (C++20から`<=>`により使用可能) | C++17 |
| `constexpr bool operator>(monostate, monostate) noexcept;`  | 左辺が右辺より大きいかを判定する。`false`を返す (C++20から`<=>`により使用可能) | C++17 |
| `constexpr bool operator>=(monostate, monostate) noexcept;` | 左辺が右辺以上かを判定する。`true`を返す (C++20から`<=>`により使用可能) | C++17 |


## 例
```cpp example
#include <iostream>
#include <variant>

int main()
{
  // デフォルト構築で空にする
  std::variant<std::monostate, int, double> v;

  if (std::holds_alternative<std::monostate>(v)) {
    std::cout << "empty" << std::endl;
  }

  v = 1;
  v = std::monostate{}; // 空にする
}
```
* std::monostate[color ff0000]
* std::variant[link variant.md]
* std::holds_alternative[link holds_alternative.md]

### 出力
```
empty
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.3 [mark verified]
- [GCC](/implementation.md#gcc): 4.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
