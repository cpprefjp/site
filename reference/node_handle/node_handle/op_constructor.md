# コンストラクタ
* cpp17[meta cpp]
* node_handle[meta category]
* node_handle[meta class]
* function[meta id-type]
* [meta namespace]

```cpp
constexpr node_handle() noexcept : ptr_(), alloc_() {} // (1) C++26

node_handle(node_handle&& nh) noexcept;           // (2) C++17
constexpr node_handle(node_handle&& nh) noexcept; // (2) C++26
```

## 概要
- (1) : デフォルトコンストラクタ
- (2) : ムーブコンストラクタ

## 効果
(2) : ノードハンドルオブジェクトを `nh.ptr_` で `ptr_` を初期化して構築する。`alloc_`を`nh.alloc_`でムーブコンストラクトする。
`nh.ptr_` に `nullptr` を割り当て、`nh.alloc_` に `nullopt` を割り当てる。


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::set<int>::node_type nh;                  // (1)
  // std::set<int>::node_type nh2 = nh;         // コピー構築はできない
  std::set<int>::node_type nh2 = std::move(nh); // (2)
  std::cout << static_cast<bool>(nh2);
}
```
* node_type[color ff0000]


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
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
