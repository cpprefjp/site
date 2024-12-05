# operator=
* cpp17[meta cpp]
* node_handle[meta category]
* node_handle[meta class]
* function[meta id-type]
* [meta namespace]

```cpp
node_handle& operator=(node_handle&& nh);
```

## 概要
ムーブ代入する。


## 要件
`!alloc_`、または`std::allocator_traits<allocator_type>::propagate_on_container_move_assignment::value` が `true`、または `alloc_ == nh.alloc_` のいずれか。


## 効果
- `ptr_ != nullptr` の場合、
    - `std::allocator_traits<allocator_type>::destroy` を呼び出して `ptr_` が指す `container_node_type` オブジェクト内の `value_type` サブオブジェクトを破棄し、
    - 次に `std::allocator_traits<allocator_type>::template rebind_traits<container_node_type>::deallocate` を呼び出して `ptr_` の割り当てを解除する。
- `ptr_` に `nh.ptr_` を代入する。
- `!alloc_` または `std::allocator_traits<allocator_type>::propagate_on_container_move_assignment::value` が `true` の場合、`nh.alloc_` を `alloc_` にムーブ代入する。
- `nh.ptr_` に `nullptr` を代入し、`nh.alloc_` に `nullopt` を代入する。


## 戻り値
`*this`

## 例外
なげない。

## 備考
ムーブオンリーであり、コピー構築はできない。


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::set<int>::node_type nh;
  // std::set<int>::node_type nh2 = nh;         // コピー構築はできない
  std::set<int>::node_type nh2 = std::move(nh);
  std::cout << static_cast<bool>(nh2);
}
```

### 出力
```
0
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 5 [mark verified]


## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
