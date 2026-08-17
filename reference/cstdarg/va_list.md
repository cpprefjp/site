# va_list
* std[meta namespace]
* cstdarg[meta header]
* type-alias[meta id-type]

```cpp
namespace std {
  using va_list = unspecified;
}
```
* unspecified[italic]

## 概要
`va_list`は、関数が受け取った可変個数の引数にアクセスするために必要な情報を保持する型である。

[`va_start`](va_start.md)マクロによって初期化し、[`va_arg`](va_arg.md)マクロで各引数を順に取り出し、[`va_end`](va_end.md)マクロで後始末を行う。


## 例
```cpp example
#include <cstdarg>
#include <iostream>

// count個のint引数の合計を求める
int sum(int count, ...)
{
  std::va_list args;
  va_start(args, count);

  int total = 0;
  for (int i = 0; i < count; ++i) {
    total += va_arg(args, int);
  }

  va_end(args);
  return total;
}

int main()
{
  std::cout << sum(3, 10, 20, 30) << std::endl;
}
```
* std::va_list[color ff0000]
* va_start[link va_start.md]
* va_arg[link va_arg.md]
* va_end[link va_end.md]

### 出力
```
60
```


## 関連項目
- [`va_start`](va_start.md): 可変引数へのアクセスを開始する
- [`va_arg`](va_arg.md): 次の可変引数を取得する
- [`va_end`](va_end.md): 可変引数へのアクセスを終了する
- [`va_copy`](va_copy.md): `va_list`オブジェクトを複製する
