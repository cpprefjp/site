# va_arg
* cstdarg[meta header]
* macro[meta id-type]

```cpp
#define va_arg(ap, type) unspecified
```
* unspecified[italic]

## 概要
[`va_list`](va_list.md)オブジェクト`ap`から、`type`型の次の可変引数を取得する。

`va_arg`を呼び出すたびに、`ap`は次の引数を指すように進む。


## 戻り値
`type`型に変換した、次の可変引数の値。


## 備考
- 取得する引数が存在しない場合、または実際に渡された引数の型と`type`が互換でない場合、動作は未定義である（ただし、符号の有無だけが異なる整数型どうしなど、一部の組み合わせは許容される）。
- `ap`は、あらかじめ[`va_start`](va_start.md)または[`va_copy`](va_copy.md)で初期化されていなければならない。


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
* va_arg[color ff0000]
* std::va_list[link va_list.md]
* va_start[link va_start.md]
* va_end[link va_end.md]

### 出力
```
60
```


## バージョン
### 言語
- C++98


## 関連項目
- [`va_start`](va_start.md): 可変引数へのアクセスを開始する
- [`va_end`](va_end.md): 可変引数へのアクセスを終了する
