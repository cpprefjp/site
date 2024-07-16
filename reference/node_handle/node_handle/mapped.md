# mapped
* cpp17[meta cpp]
* node_handle[meta category]
* node_handle[meta class]
* function[meta id-type]
* [meta namespace]

```cpp
mapped_type& mapped() const; // set コンテナには存在ない
```

## 概要
このノードハンドルによって管理されている `map` コンテナ要素の `mapped_type` メンバ（キーではない方）を指す参照を返す。


## 要件
`empty() == false`


## 戻り値
`ptr_` が指す `container_node_type` オブジェクト内の `value_type` サブオブジェクトの `mapped_type` メンバへの参照。


## 例外
投げない。


## 例
```cpp example
#include <iostream>
#include <map>
#include <string>

int main()
{
  std::map<int, std::string> m = { 
    { 1, "nya" },
    { 2, "nyan" },
    { 3, "nyau" }
  };

  auto nh = m.extract(m.begin());
  std::cout << nh.mapped();
}
```
* mapped[color ff0000]


### 出力
```
nya
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
