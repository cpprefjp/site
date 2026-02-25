# owner_hash
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
size_t owner_hash() const noexcept; // (1) C++26
```

## 概要
所有権ベースでのハッシュ値を取得する。


## 戻り値
所有権が等価な（[`owner_equal()`](owner_equal.md)が`true`を返す）`shared_ptr`および[`weak_ptr`](/reference/memory/weak_ptr.md)オブジェクトに対して、同じハッシュ値を返す。


## 備考
この関数は、所有権ベースでのハッシュを提供する。[`std::hash`](/reference/functional/hash.md)`<shared_ptr<T>>`が保持するポインタの値をもとにしたハッシュを提供するのに対し、`owner_hash()`は所有権（参照カウンタオブジェクト）をもとにしたハッシュを提供する。

これにより、[`owner_equal`](/reference/memory/owner_equal.md)と組み合わせて、`shared_ptr`や[`weak_ptr`](/reference/memory/weak_ptr.md)を[`unordered_map`](/reference/unordered_map/unordered_map.md)や[`unordered_set`](/reference/unordered_set/unordered_set.md)のキーとして使用できる。


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> org(new int(42));

  // 別名コンストラクタで異なるポインタを指すが、所有権は同じ
  std::shared_ptr<int> alias(org, org.get());

  std::cout << std::boolalpha;
  std::cout << (org.owner_hash() == alias.owner_hash()) << std::endl;
}
```
* owner_hash[color ff0000]

### 出力
```
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
- [`owner_equal()`](owner_equal.md)
- [`std::owner_hash`](/reference/memory/owner_hash.md)
- [`owner_before()`](owner_before.md)


## 参照
- [P1901R2 Enabling the Use of `weak_ptr` as Keys in Unordered Associative Containers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1901r2.html)
