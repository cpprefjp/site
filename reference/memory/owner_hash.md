# owner_hash
* memory[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  struct owner_hash;
}
```

## 概要
`owner_hash`は、スマートポインタを所有権ベースでハッシュするための関数オブジェクトである。

スマートポインタを、[`unordered_set`](/reference/unordered_set/unordered_set.md)や[`unordered_map`](/reference/unordered_map/unordered_map.md)のキーにする際、値ベースではなく所有権ベースにハッシュすることを指定するために使用する。

[`owner_equal`](owner_equal.md)と組み合わせて使用する。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|------|-------|
| [`operator()`](owner_hash/op_call.md) | 関数呼び出し演算子 | C++26 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------|-----------------------------------------------------------|-------|
| `is_transparent` | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依存の型であるがあくまでタグ型であり、型そのものには意味はない。 | C++26 |


## 例
```cpp example
#include <print>
#include <memory>
#include <unordered_set>

template <class Key>
using shared_ptr_uset = std::unordered_set<
  std::shared_ptr<Key>,
  std::owner_hash,
  std::owner_equal
>;

struct X {
  int i;
  int j;
};

int main()
{
  shared_ptr_uset<int> us;

  std::shared_ptr<int> p1(new int(2));

  std::shared_ptr<X> px(new X());
  // 同じ所有権(px)を持つが、異なるポインタを指すp2とp3
  std::shared_ptr<int> p2(px, &(px->i));
  std::shared_ptr<int> p3(px, &(px->j));

  us.insert(p1);
  us.insert(p2);
  us.insert(p3); // owner_hashでは、p2とp3が同じリソースを
                 // 指していると見なされるので、p3は挿入されない

  std::println("{}", s.size());
}
```
* std::owner_hash[color ff0000]
* std::owner_equal[link owner_equal.md]
* us.insert[link /reference/unordered_set/unordered_set/insert.md]

### 出力
```
2
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::owner_equal`](owner_equal.md)
- [`std::owner_less`](owner_less.md)
- [`std::shared_ptr::owner_hash()`](shared_ptr/owner_hash.md)
- [`std::weak_ptr::owner_hash()`](weak_ptr/owner_hash.md)


## 参照
- [P1901R2 Enabling the Use of `weak_ptr` as Keys in Unordered Associative Containers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1901r2.html)
