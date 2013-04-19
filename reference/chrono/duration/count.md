#count
```cpp
constexpr rep count() const;
```

##概要

<b>duration内の値を取得する。</b>
<b></b>


##戻り値

`duration`内の`rep`値。



##例

```cpp
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::nano;

int main()
{
  duration<int, nano> d(2); // 2ナノ秒

  std::cout << d.count() << std::endl;
}
```
* count[color ff0000]

###出力

```cpp
2
```

##バージョン


###言語


- C++11



###処理系


- GCC: 4.5.1, 4.6.1


