# get_allocator
* cpp17[meta cpp]
* node_handle[meta category]
* node_handle[meta class]
* function[meta id-type]
* [meta namespace]

```cpp
allocator_type get_allocator() const;           // (1) C++17
constexpr allocator_type get_allocator() const; // (1) C++26
```

## 概要
格納されているアロケータ(元のコンテナのアロケータ)のコピーを返す。


## 要件
`empty() == false`


## 戻り値
`*alloc_`


## 例外
投げない。


## 例
```cpp example
#include <set>

int main()
{
  std::set s = { 1, 2, 3 };
  auto nh = s.extract(s.begin());
  [[maybe_unused]] auto alloc = nh.get_allocator();
}
```
* get_allocator[color ff0000]


### 出力
```
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
