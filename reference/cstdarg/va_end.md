# va_end
* cstdarg[meta header]
* macro[meta id-type]

```cpp
#define va_end(ap) unspecified
```
* unspecified[italic]

## 概要
[`va_start`](va_start.md)または[`va_copy`](va_copy.md)で初期化した[`va_list`](va_list.md)オブジェクト`ap`の後始末を行う。


## 効果
`ap`を無効化する。この呼び出し以降、`ap`を再び使用するには改めて[`va_start`](va_start.md)または[`va_copy`](va_copy.md)で初期化する必要がある。


## 戻り値
なし


## 備考
- [`va_start`](va_start.md)または[`va_copy`](va_copy.md)で初期化した`va_list`オブジェクトは、それを初期化した関数から戻る前に、対応する`va_end`で後始末しなければならない。これを怠った場合の動作は未定義である。


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
* va_end[color ff0000]
* std::va_list[link va_list.md]
* va_start[link va_start.md]
* va_arg[link va_arg.md]

### 出力
```
60
```


## バージョン
### 言語
- C++03


## 関連項目
- [`va_start`](va_start.md): 可変引数へのアクセスを開始する
- [`va_arg`](va_arg.md): 次の可変引数を取得する
- [`va_copy`](va_copy.md): `va_list`オブジェクトを複製する
