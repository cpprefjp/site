```cpp
namespace std {

  extern "C" void atomic_signal_fence(memory_order order) noexcept;
}
```
* memory_order[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]

##概要

<b>同一スレッド内のシグナルハンドラ実行との間でのみ有効なメモリフェンスを発行する。</b>


##効果

この関数は、スレッドと、そのスレッド上で処理されるシグナルハンドラとの間でのみ、その効果が有効である、という点を除いて[`atomic_thread_fence`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_thread_fence)(order)と同じ効果を持つ。


##戻り値

なし


##例外

投げない


##備考



##例

```cpp
```

###出力

```cpp
##バージョン
```

###言語


- C++11



###処理系

- [Clang](https://sites.google.com/site/cpprefjp/implementation#clang): ??
- [GCC](https://sites.google.com/site/cpprefjp/implementation#gcc): 
- [GCC, C++0x mode](https://sites.google.com/site/cpprefjp/implementation#gcc): 4.7.0
- [ICC](https://sites.google.com/site/cpprefjp/implementation#icc): ??
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) ??



##参照

[How to correctly use std::atomic_signal_fence()?](http://stackoverflow.com/questions/14581090/how-to-correctly-use-stdatomic-signal-fence)

