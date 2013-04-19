#operator-
```cpp
constexpr duration operator-() const;
```

##概要

負のdurationを生成する

##戻り値

`duration(rep_)`
※ rep_は内部で保持している値。メンバ変数名は説明用のもの


##例

```cpp
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::nano;

int main()
{
  duration<int, nano> d1(2);

  duration<int, nano> d2 = -d1;

  std::cout << d1.count() << std::endl;
  std::cout << d2.count() << std::endl;
}
```
* -[color ff0000]

###出力

```cpp
2
-2
```

##バージョン


###言語


- C++11



###処理系


- GCC: 4.5.1, 4.6.1

