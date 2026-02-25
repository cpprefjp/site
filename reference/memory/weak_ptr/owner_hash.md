# owner_hash
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
size_t owner_hash() const noexcept; // (1) C++26
```

## 概要
所有権ベースでのハッシュ値を取得する。


## 戻り値
所有権が等価な（[`owner_equal()`](owner_equal.md)が`true`を返す）[`shared_ptr`](/reference/memory/shared_ptr.md)および`weak_ptr`オブジェクトに対して、同じハッシュ値を返す。


## 備考
この関数は、所有権ベースでのハッシュを提供する。

[`owner_equal()`](owner_equal.md)と[`std::owner_hash`](/reference/memory/owner_hash.md)を組み合わせて、`weak_ptr`を[`unordered_map`](/reference/unordered_map/unordered_map.md)や[`unordered_set`](/reference/unordered_set/unordered_set.md)のキーとして使用できる。

詳細は、[`shared_ptr`](/reference/memory/shared_ptr.md)の[`owner_hash()`](/reference/memory/shared_ptr/owner_hash.md)メンバ関数を参照。


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> sp(new int(42));
  std::weak_ptr<int> wp = sp;

  std::cout << std::boolalpha;
  std::cout << (sp.owner_hash() == wp.owner_hash()) << std::endl;
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
