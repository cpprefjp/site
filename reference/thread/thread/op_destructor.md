# デストラクタ
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~thread();
```

## 概要
`thread`オブジェクトを破棄する。


## 効果
デストラクタ呼び出し時点で`thread`オブジェクトにスレッドが関連付けられている場合、[`std::terminate()`](/reference/exception/terminate.md)を呼び出してプ�グラムを終了する。既にjoin操作またはdetach操作済みの（つまり、`thread`オブジェクトが既にスレッドと関連付けられていない）場合は何もしない。


## 例
```cpp example
#include <thread>

int main()
{
  {
    std::thread t([]{ /*...*/ });
    // thdに対してjoin()もdetach()も行わない。

    // thdのデストラクタ呼び出しでプ�グラム終了!
  }

  return 0;
}
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 4.6.3, 4.7.0
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照
