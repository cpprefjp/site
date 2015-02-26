#operator<= (C++11)
* typeindex[meta header]
* std[meta namespace]
* type_index[meta class]

```cpp
bool operator<=(const type_index& rhs) const noexcept;
```

##概要
左辺が右辺以下かの判定を行う。


##戻り値
`!rhs.target->before(*target)`

※`target`は、`type_index`のメンバ変数として保持されている`type_info`オブジェクトへのポインタ(説明用)


##例外
投げない


##例
```cpp
#include <iostream>
#include <typeindex>
#include <set>
#include <string>
#include <algorithm>

std::string get_typename(const std::type_index& t)
{
  if (t == typeid(int))    return "int";
  if (t == typeid(double)) return "double";
  if (t == typeid(char))   return "char";
  return "bad type!!!";
}

int main()
{
  std::set<std::type_index, std::less_equal<std::type_index>> s;

  s.insert(typeid(int));
  s.insert(typeid(double));
  s.insert(typeid(char));

  std::for_each(s.begin(), s.end(), [](const std::type_index& t) {
    std::cout << get_typename(t) << std::endl;
  });
}
```
* std::less_equal<std::type_index>[color ff0000]

###出力例
```
char
double
int
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1


