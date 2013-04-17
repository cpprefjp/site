#デストラクタ
```cpp
<pre>~thread();</pre>
```

##概要

`thread`オブジェクトを破棄する。<b>
</b>


##効果

デストラクタ呼び出し時点で`thread`オブジェクトにスレッドが関連付けられている場合、[`std::terminate()`](/reference/exception/terminate.md)を呼び出してプログラムを終了する。既にjoin操作またはdetach操作済みの（つまり、`thread`オブジェクトが既にスレッドと関連付けられていない）場合は何もしない。


##備考



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

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

<li>[Clang](/implementation#clang.md):
</li>
<li>[GCC](/implementation#gcc.md):
</li>

- [GCC, C++0x mode](/implementation#gcc.md): 4.6.3, 4.7.0
<li>[ICC](/implementation#icc.md):
</li>
<li>[Visual C++](/implementation#visual_cpp.md):
</li>
<h4>備考</h4>

(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```