# set_emit_on_sync
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_syncbuf[meta class]
* cpp20[meta cpp]


```cpp
void set_emit_on_sync(bool b) noexcept;
```

## 概要
現在の同期時排出ポリシーを変更する。ここで、同期時排出ポリシーとは[`sync()`](sync.md)が呼ばれたとき[`emit()`](emit.md)を呼び出すかどうかを表す内部フラグであり、デフォルトでは`false`である。  
同期時排出ポリシーが`false` (デフォルト) のときは、あらゆるフラッシュが`emit()`の呼び出しまで延期され、`true` のときは、フラッシュが直ちに適用される。


## 効果
同期時排出ポリシーを、引数`b`の値に変更する。


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <syncstream>
#include <iostream>

int main()
{
  std::osyncstream bout{std::cout};
  bout << std::emit_on_flush; // std::emit_on_flush は rdbuf()->set_emit_on_sync(true)
                              // を呼び出す。
  bout << "Hello, World!";
  bout.flush(); // この例で、flush() は rdbuf()->pubsync() を呼び出し、これは rdbuf()->sync()
                // を呼び出す。ここで、同期時排出ポリシーは true に設定されているため、
                // ここで emit() が呼び出され、保留中の出力がラップされたストリームに転送される。
}
```


### 出力
```
Hello, World!
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 update 10 [mark verified]


## 参照
- [P0053R7 C++ Synchronized Buffered Ostream](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0053r7.pdf)
