# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]
* function[meta id-type]

```cpp
reverse_iterator();                                       // (1) C++98
constexpr reverse_iterator();                             // (1) C++17

explicit reverse_iterator(Iterator x);                    // (2) C++98
constexpr explicit reverse_iterator(Iterator x);          // (2) C++17

template <class U>
reverse_iterator(const reverse_iterator<U>& u);           // (3) C++98

template <class U>
constexpr reverse_iterator(const reverse_iterator<U>& u); // (3) C++17
```

## 概要
`reverse_iterator`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。内包する元となるイテレータである`current`メンバ変数を初期化する。
    - C++98 : `current`をデフォルト初期化する
    - C++11 : `current`を値初期化する。このイテレータに対する操作は、値初期化された`Iterator`型のイテレータに対して対応する操作が定義されている場合にのみ、定義された動作をする
- (2) : 元となるイテレータ`x`を受け取り、メンバ変数`current`に保持する。
- (3) : `u.current`をメンバ変数`current`に保持する。

## テンプレートパラメータ制約

- C++17まで
    - (3) : `U`が`Iterator`に変換可能であること
- C++20
    - (3) : 次の両方を満たす
        - `is_same_v<U, Iterator> == false`であること。
        - `const U&, Iterator`が[`convertible_to<Iterator>`](/reference/concepts/convertible_to.md)のモデルとなること。

## 要件
- (3) : `U`が`Iterator`に変換可能であること


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it1(v.end()); // 元となるイテレータで初期化
  std::reverse_iterator<decltype(v)::const_iterator> it2 = it1; // イテレータの変換
  std::reverse_iterator<decltype(v)::const_iterator> end(v.begin());

  for (; it2 != end; ++it2) {
    std::cout << *it2 << std::endl;
  }
}
```

### 出力
```
3
2
1
```

## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
- [LWG Issue 1012. `reverse_iterator` default ctor should value initialize](https://cplusplus.github.io/LWG/issue1012)
    - C++11で、デフォルトコンストラクタの効果が、内包するイテレータのデフォルト初期化から値初期化へ改められた
- [LWG Issue 3435. `three_way_comparable_with<reverse_iterator<int*>, reverse_iterator<const int*>>`](https://cplusplus.github.io/LWG/issue3435)
