# emit
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_syncbuf[meta class]
* cpp20[meta cpp]


```cpp
bool emit();
```

## 概要
格納されている文字データを、ラップされたストリームに転送する。このような転送は、同じストリームを持つ他の`basic_syncbuf`オブジェクトによる転送に関してアトミックである。


## 効果
保留中の出力をラップされたストリームにアトミックに転送する。出力は、連続した文字の並びとして出力ストリームに現れる。  
また、最後に`emit()`が呼び出されてから[`sync()`](sync.md)が呼び出されている場合、ラップされたストリームに対して`pubsync()`を呼び出してフラッシュも行う。


## 戻り値
以下の条件がすべて満たされる場合は`true`、そうでない場合は`false`を返す。

- ラップされたストリームが存在する。(ラップされたストリームへのポインタが`nullptr`でない。)
- 保留中の出力内のすべての文字は正常に転送された。
- 要求されている場合、ラップされたストリームに対する`pubsync()`の呼び出しは成功した。


## 事後条件
成功すると、書き込まれた文字データは空になる。


## 同期操作
同じストリームバッファオブジェクトに文字を転送するすべての`emit()`呼び出しは、「よりも前に発生する」関係と一致する全順序で実行されるように見える。各`emit()`呼び出しは、その全順序で後続の`emit()`呼び出し**と同期する**。実際には、これは下記の備考にあることを意味する。

注：ここでは、「よりも前に発生する」関係は全順序関係になっていると考えられる。また、modification order と矛盾しないとも考えられる。下記の参照を参照のこと。

## 備考
ラップされたストリームに一意に関連付けられたロックを保持しながら、ラップされたストリームのメンバ関数を呼び出すことができる。つまり、同じストリームを持つ他の`basic_syncbuf`オブジェクトに対してアトミックに転送することができる。


## 例
```cpp example
#include <iostream>
#include <syncstream>
#include <thread>

void thread1()
{
  std::osyncstream bout{std::cout};
  bout << "Hello, World!\n";
  bout.emit();  // 通常 std::basic_osyncstream から呼ばれる。
                // 文字が転送される。
}

void thread2()
{
  // 同じバッファに行われる出力は、異なる std::basic_osyncstream(std::basic_syncbuf) の
  // インスタンスからでも、アトミックに出力されることが保証される
  std::osyncstream(std::cout) << "Goodbye, " << "Planet!" << '\n';
}

int main()
{
  std::thread th1(thread1);
  std::thread th2(thread2);
  th1.join();
  th2.join();
}
```
* emit[color ff0000]

### 出力例
thread1 の処理が先行した場合。ただし、各出力は連続したシーケンスとなるように、アトミックに行われることが保証される。

```
Hello, World!
Goodbye, Planet!
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
- [C++ メモリモデル メモ - Qiita](https://qiita.com/nojima/items/57da2c4098309386e26b#modification-order)
- [C++のフェンス is 何 - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20130427/p1)
- [半順序？弱順序？二項関係・順序関係まとめ - ぬぬろぐ](http://nunuki.hatenablog.com/entry/2016/12/23/182301)
- [［C++］狭義の弱順序（strict weak orderings）とは？ - 地面を見下ろす少年の足蹴にされる私](https://onihusube.hatenablog.com/entry/2018/09/18/022130)
