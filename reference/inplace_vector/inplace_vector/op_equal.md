# operator==
* inplace_vector[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, std::size_t N>
  constexpr bool operator==(const inplace_vector<T, N>& x,
                            const inplace_vector<T, N>& y); // (1) C++26
}
```

## 概要
`inplace_vector`オブジェクトの等値比較を行う。


## 要件
型`T`が`==`で比較可能であること。


## 戻り値
`x`と`y`の要素数および要素の値が等しければ`true`、そうでなければ`false`を返す。


## 計算量
線形時間。ただし、`x`と`y`のサイズが異なる場合は定数時間。


## 備考
- この演算子により、以下の演算子が使用可能になる：
    - `operator!=`


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> v1 = {1, 2, 3};
  std::inplace_vector<int, 5> v2 = {1, 2, 3};
  std::inplace_vector<int, 5> v3 = {1, 2, 4};

  // operator==
  std::println("{}", (v1 == v2));
  std::println("{}", (v1 == v3));

  // operator==から自動導出されるoperator!=
  std::println("{}", (v1 != v2));
  std::println("{}", (v1 != v3));
}
```

### 出力
```
true
false
false
true
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]

## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
