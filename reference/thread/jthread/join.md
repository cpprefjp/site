# join
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void join();
```

## 概要
スレッドが終了するまで待機する


## 要件
`thread`オブジェクトにスレッドが関連付けられていること([`joinable()`](joinable.md) `== true`)。


## 効果
`this`に関連付けれられたスレッドが完了するまで、この関数を呼び出したスレッドをブロックする。


## 同期
関連付けられたスレッドの完了は、`join()`メンバ関数の正常リターンと **同期する** 。

つまり、「`this`に関連付けられたスレッドT1上で行われる全処理の完了」は、
「`join()`メンバ関数を呼び出したスレッドT0上での同メンバ関数からの正常リターン」よりも **前に発生する** 。


## 事後条件
`this`は何も指さない空の`thread`オブジェクトとなる。


## 例外
join操作に失敗した場合、[`system_error`](/reference/system_error/system_error.md)例外を投げる。


## 例

```cpp example
#include <cassert>
#include <thread>

int main()
{
  int x = 0;
  std::jthread t([&]{ ++x; });

  // ここでxにアクセスするとdata raceにより未定義動作

  t.join();

  // 別スレッド上で行われた全処理が完了している
  assert(x == 1);

  return 0;
}
```
* join()[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
