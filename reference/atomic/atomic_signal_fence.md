#atomic_signal_fence (C++11)
```cpp
namespace std {
  extern "C" void atomic_signal_fence(memory_order order) noexcept;
}
```
* memory_order[link ./memory_order.md]


##概要
同一スレッド内のシグナルハンドラ実行との間でのみ有効なメモリフェンスを発行する。


##効果
この関数は、スレッドと、そのスレッド上で処理されるシグナルハンドラとの間でのみ、その効果が有効である、という点を除いて[`atomic_thread_fence`](./atomic_thread_fence.md)`(order)`と同じ効果を持つ。


##戻り値
なし


##例外
投げない


##例
```cpp
```


###出力
```
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照
[How to correctly use std::atomic_signal_fence()?](http://stackoverflow.com/questions/14581090/how-to-correctly-use-stdatomic-signal-fence)

