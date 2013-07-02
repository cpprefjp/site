#デストラクタ(C++11)
```cpp
~thread();
```

##概要
`thread`オブジェクトを破棄する。


##効果
デストラクタ呼び出し時点で`thread`オブジェクトにスレッドが関連付けられている場合、[`std::terminate()`](/reference/exception/terminate.md)を呼び出してプログラムを終了する。既にjoin操作またはdetach操作済みの（つまり、`thread`オブジェクトが既にスレッドと関連付けられていない）場合は何もしない。


##例
```cpp
#include <thread>

int main()
{
  {
    std::thread thd([]{ /*...*/ });
    // thdに対してjoin()もdetach()も行わない。

    // thdのデストラクタ呼び出しでプログラム終了!
  }

  return 0;
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md):
- [GCC](/implementation#gcc.md):
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.3, 4.7.0
- [ICC](/implementation#icc.md):
- [Visual C++](/implementation#visual_cpp.md):


##参照
