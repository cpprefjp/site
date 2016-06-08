#errno
* cerrno[meta header]
* variable[meta id-type]

```cpp
thread_local int errno = 0;
```

##概要
`errno`は、標準ライブラリのエラー状態を表すグローバル変数である。

この変数は、以下の特徴を持つ：

- プログラム起動時に値`0`で初期化される (正常値)
- スレッドローカル記憶域に保持される


##例
```cpp
#include <iostream>
#include <cmath>

int main()
{
  std::acosh(0.1f);
  if (errno == EDOM) {
    std::cout << "定義域エラー" << std::endl;
  }
}
```
* std::acosh[link /reference/cmath/acosh.md]


