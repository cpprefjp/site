#operator->
```cpp
const T* operator->() const;
```

##概要

<b>イテレータを通してオブジェクトにアクセスする</b>


##戻り値

&(operator*())



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

###出力

```cpp
1
2
3
```

##参照


