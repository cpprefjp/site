#atexit
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  extern "C" int atexit(void (*f)(void));          // (1) C++03
  extern "C" int atexit(void (*f)(void)) noexcept; // (1) C++11

  extern "C++" int atexit(void (*f)(void));          // (2) C++03
  extern "C++" int atexit(void (*f)(void)) noexcept; // (2) C++11
}
```

##概要
プログラムが通常の方法で終了するときに呼ばれる関数を登録する。


##効果
この関数に指定した関数は、以下の条件のときに呼び出される：

- `main()`関数が返る。
- [`std::exit()`](./exit.md)関数が呼び出される。

指定された関数は、プログラムの終了処理において、`static`変数の破棄が行われる前に呼び出される。

指定された関数の中で例外が送出された場合、[`std::terminate()`](/exception/terminate.md)関数が呼び出され、プログラムが異常終了する。


##戻り値
関数の登録に成功した場合は`0`が返り、失敗した場合は非`0`が返る。


##例
```cpp
#include <iostream>
#include <cstdlib>

void on_exit()
{
    std::cout << "on exit" << std::endl;
}

int main()
{
    std::atexit(on_exit);
}
```

###出力
```
on exit
```


##関連項目

| 名前 | 説明 |
|------|------|
| [`exit`](./exit.md) | `exit`関数でプログラムが終了するときに呼ばれる関数を指定する |


