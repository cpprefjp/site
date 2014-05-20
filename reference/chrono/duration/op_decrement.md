#operator-- (C++11)
```cpp
duration& operator--();
duration operator--(int);
```

##概要
`duration`の値をデクリメントする


##戻り値
- `duration& opertor--()` : `--rep_; return *this`;
- `duration operator--(int)` : `return duration(rep_--);`
※ `rep_`は内部で保持している値。メンバ変数名は説明用のもの。


##例
```cpp
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::nano;

int main()
{
  // 前置デクリメント
  {
    duration<int, nano> d(2);

    std::cout << (--d).count() << std::endl;
    std::cout << d.count() << std::endl;
  }
  std::cout << std::endl;

  // 後置デクリメント
  {
    duration<int, nano> d(2);

    std::cout << (d--).count() << std::endl;
    std::cout << d.count() << std::endl;
  }
}
```

##出力
```
1
1

2
1
```

##バージョン
###言語
- C++11

###処理系
- GCC: 4.5.1, 4.6.1

