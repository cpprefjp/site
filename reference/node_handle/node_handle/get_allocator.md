# get_allocator
* cpp17[meta cpp]
* node_handle[meta header]
* node_handle[meta class]
* function template[meta id-type]
* [meta namespace]

```cpp
allocator_type get_allocator() const;
```

## 概要
格納されているア�ケータ(元のコンテナのア�ケータ)のコピーを返す。


## 要件
`empty() == false`


## 戻り値
`*alloc_`


## 例外
投げない。


## 例
```cpp example
#include <iostream>
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
0
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0.0
- [GCC](/implementation.md#gcc): 7.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 5


## 参照
- [Splicing Maps and Sets(Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0083r3.pdf)
