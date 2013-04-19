#type_index
```cpp
namespace std {
  class type_index;

}
```

###概要
type_indexは、[type_info](/reference/typeinfo/type_info.md)を連想コンテナや非順序連想コンテナのインデックス型として使用するためのクラスである。


###メンバ関数

| | |
|------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [(constructor)](./type_index/type_index.md) | コンストラクタ |
| [operator==](./type_index/equal.md) | 等値判定を行う |
| [operator!=](./type_index/not_equal.md) | 非等値判定を行う |
| [operator<](./type_index/less.md) | 左辺が右辺より小さいかの判定を行う |
| [operator<=](./type_index/less_equal.md) | 左辺が右辺以下かの判定を行う |
| [operator>](./type_index/greater.md) | 左辺が右辺より大きいかの判定を行う |
| [operator>=](./type_index/greater_equal.md) | 左辺が右辺以上かの判定を行う |
| [hash_code](./type_index/hash_code.md) | ハッシュ値を取得する |
| [name](./type_index/name.md) | 型名を取得する |



###例

```cpp
#include <iostream>
#include <map>
#include <typeindex>

int main()
{
  std::map<std::type_index, int> m = {
    { typeid(int),    3 },
    { typeid(double), 1 },
    { typeid(char),   4 }
  };

  std::cout << m.at(typeid(int)) << std::endl;
  std::cout << m.at(typeid(double)) << std::endl;
  std::cout << m.at(typeid(char)) << std::endl;
}
```
* std::type_index, int> m = {[color ff0000]
* typeid(int)[color ff0000]
* typeid(double)[color ff0000]
* typeid(char)[color ff0000]




###出力

```cpp
3
1
4
```




###言語

- C++11

###処理系

- GCC, C++0x mode: 4.6.1


