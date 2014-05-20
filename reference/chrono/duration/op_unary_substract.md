#operator- (C++11)
```cpp
constexpr duration operator-() const;
```

##概要
負の`duration`を生成する

##戻り値
`duration(-rep_)`
※ `rep_`は内部で保持している値。メンバ変数名は説明用のもの


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

###出力
```
2
-2
```

##バージョン
###言語
- C++11

###処理系
- GCC: 4.5.1, 4.6.1

