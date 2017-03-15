# atomic_signal_fence
* atomic[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  extern "C" void atomic_signal_fence(memory_order order) noexcept;
}
```
* memory_order[link memory_order.md]


## 概要
同一スレッド内のシグナルハンドラ実行との間でのみ有効なメモリフェンスを発行する。


## 効果
この関数は、スレッドと、そのスレッド上で処理されるシグナルハンドラとの間でのみ、その効果が有効である、という点を除いて[`atomic_thread_fence`](atomic_thread_fence.md)`(order)`と同じ効果を持つ。


## 戻り値
なし


## 例外
投げない


## 例
```cpp
```


### 出力
```
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


## 参照
[How to correctly use std::atomic_signal_fence()?](http://stackoverflow.com/questions/14581090/how-to-correctly-use-stdatomic-signal-fence)

