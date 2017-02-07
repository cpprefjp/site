#operator->
* iterator[meta header]
* std[meta namespace]
* istream_iterator[meta class]
* function[meta id-type]

```cpp
const T* operator->() const;
```

##概要
イテレータを通してオブジェクトにアクセスする


##戻り値
`&(operator*())`


##例
```cpp
#include <iostream>
#include <iterator>
#include <sstream>

int main()
{
  std::stringstream ss;
  ss << 1 << std::endl
     << 2 << std::endl
     << 3;

  std::istream_iterator<std::string> it(ss);
  std::istream_iterator<std::string> last;

  for (; it != last; ++it) {
    std::cout << it->c_str() << std::endl;
  }
}
```
* it->c_str()[color ff0000]
* std::stringstream[link /reference/sstream/basic_stringstream.md]

###出力
```
1
2
3
```

##参照


