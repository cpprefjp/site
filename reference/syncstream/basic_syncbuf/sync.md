# sync
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_syncbuf[meta class]
* cpp20[meta cpp]


```cpp
protected:
int sync() override;
```

## 概要
フラッシュが保留されていることを記録する。その後、同期時排出ポリシーに応じて[`emit()`](emit.md)を呼び出す。同期時排出ポリシーは[`set_emit_on_sync()`](set_emit_on_sync.md)で変更することができる。


## 効果
ラップされたストリームバッファがフラッシュされることを記録する。  
その後、同期時排出ポリシーが`true`ならば、`emit()`を呼び出す。


## 戻り値
`emit()`が呼び出されて`false`を戻した場合は、-1、そうでなければ 0 を返す。


## 備考
同期時排出ポリシーが`false`の場合、実際のフラッシュは`emit()`が呼び出されるまで遅延する。


## 例
```cpp example
#include <iostream>
#include <syncstream>

int main()
{
  std::osyncstream bout{std::cout};
  bout << "Hello, World!";
  bout.flush();  // この例では、flush() が rdbuf()->pubsync() を呼び出し、これが rdbuf()->sync() を呼び出している。
                 // 非同期排出ポリシーはデフォルトで false なので、ここでは rdbuf()->emit() は呼ばれず、
                 // 実際のフラッシュは、bout 破棄時に rdbuf()->emit() が呼び出されるまで遅延される。
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
