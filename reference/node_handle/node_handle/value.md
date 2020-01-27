# value
* cpp17[meta cpp]
* node_handle[meta header]
* node_handle[meta class]
* function template[meta id-type]
* [meta namespace]

```cpp
value_type& value() const; // map コンテナには�在ない
```

## 概要
このノードハンドルによって管理されている `set` コンテナ要素を指す参照を返す。


## 要件
`empty() == false`


## 戻り値
`ptr_` が指す `container_node_type` オブジェクト内の `value_type` サブオブジェクトへの参照。


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
  std::cout << nh.value();
}
```
* value[color ff0000]


### 出力
```
1
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
