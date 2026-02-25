# owner_equal
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <class U>
constexpr bool
  owner_equal(const weak_ptr<U>& b) const noexcept;               // (1) C++26

template <class U>
constexpr bool
  owner_equal(const shared_ptr<U>& b) const noexcept;             // (2) C++26
```
* shared_ptr[link /reference/memory/shared_ptr.md]

## 概要
所有権ベースでの等値比較を行う。


## 戻り値
`*this`と`b`が所有権を共有しているか、両方とも空であれば`true`を返し、そうでなければ`false`を返す。

以下の式と等価：

```cpp
!owner_before(b) && !b.owner_before(*this)
```
* owner_before[link owner_before.md]


## 備考
詳細は、[`shared_ptr`](/reference/memory/shared_ptr.md)の[`owner_equal()`](/reference/memory/shared_ptr/owner_equal.md)メンバ関数を参照。


## 例
```cpp example
#include <iostream>
#include <memory>

struct X {
  int i;
  int j;
};

int main()
{
  std::shared_ptr<X> org(new X());

  std::shared_ptr<int> sa(org, &(org->i));
  std::shared_ptr<int> sb(org, &(org->j));

  std::weak_ptr<int> wa = sa;
  std::weak_ptr<int> wb = sb;

  std::cout << std::boolalpha;
  std::cout << wa.owner_equal(wb) << std::endl;  // 所有権ベース: true
  std::cout << wa.owner_equal(sa) << std::endl;  // weak_ptrとshared_ptrの比較: true
}
```
* owner_equal[color ff0000]

### 出力
```
true
true
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`owner_hash()`](owner_hash.md)
- [`owner_before()`](owner_before.md)
- [`std::owner_equal`](/reference/memory/owner_equal.md)


## 参照
- [P1901R2 Enabling the Use of `weak_ptr` as Keys in Unordered Associative Containers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1901r2.html)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)
