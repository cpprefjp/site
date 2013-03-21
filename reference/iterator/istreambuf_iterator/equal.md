```cpp
bool equal(const istreambuf_iterator& b) const;
```

##概要

<b>他のistreambuf_iteratorオブジェクトと等値比較する</b>


##戻り値

双方がストリームの終端に達していた場合(デフォルト構築した状態は終端とみなせる)、もしくは同じ位置を指していた場合は`true`を返し、そうでなければ`false`を返す。


##例

```cpp
#include <iostream>
#include <iterator>
#include <sstream>

int main()
{
  std::stringstream ss;
  ss << "123";

  std::istreambuf_iterator<char> it1(ss);
  std::istreambuf_iterator<char> it2 = it1;
  std::istreambuf_iterator<char> last;

  if (it1.equal(it2)) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }

  ++it1;
  ++it1;
  ++it1;
  if (it1.equal(last)) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* equal[color ff0000]
* equal[color ff0000]

###出力

```cpp
equal
equal
```

##参照


