#push_back
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
void push_back(const T& x); // (1)
void push_back(T&& x);      // (2) C++11
```

##概要
新たな要素を末尾に追加する。


##戻り値
なし


##計算量
償却定数時間。

この関数を呼び出す前に[`size()`](./size.md) `<` [`capacity()`](./capacity)であった場合、この関数の実行は定数時間で行われる。そうでない場合は、メモリ領域の再確保と、その領域への要素のコピーもしくはムーブが行われるため、線形時間で実行される。

`vector`の実装で行われるメモリ確保戦略では、再確保の際にそれら要素がぴったり収まるサイズを確保するのではなく、少し多めの1.5倍や2倍といったサイズのメモリを確保し、再確保の回数を減らしている。事前に追加する要素の数がわかっている場合には[`reserve`](./reserve.md)メンバ関数で事前にその要素数分のメモリを確保し、そうでない場合には`vector`のメモリ確保戦略に任せるのがよいだろう。


##備考
- 要素を追加した後の[`size()`](./size.md)が要素を追加する前の[`capacity()`](./capacity.md)よりも大きい場合は領域の再確保が生じる。領域の再確保が生じなかった場合には全てのイテレータや参照は有効である。
- 非CopyInsertableな要素型`T`のムーブコンストラクタ以外で例外が発生した場合、副作用は発生しない。


##例
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

int main()
{
  std::vector<std::string> v;

  // const&バージョン
  std::string s = "hello";
  v.push_back(s);

  // &&バージョン
  v.push_back(std::string("world"));

  std::for_each(v.begin(), v.end(), [](const std::string& x) {
    std::cout << x << std::endl;
  });
}
```
* push_back[color ff0000]

###出力
```
hello
world
```


##参照
- [２倍だけじゃない - Derive Your Dreams](http://www.kmonos.net/wlog/111.html#_2334100705)
- [それでも２倍だ - Derive Your Dreams](http://www.kmonos.net/wlog/111.html#_1001100720)
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
	- C++03では、「`vector`の`push_back()`、`deque`の`push_back()`と`push_front()`で例外が発生した場合、副作用が発生しない」という強い保証があった。
	- C++11では、ムーブ対応のため文面が見直されたが、その際に`insert()` `emplace()`とまとめて以下のような仕様となった：
		- 「(挿入操作において、)要素型 T のコピーコンストラクタ、ムーブコンストラクタ、代入演算子、ムーブ代入演算子、あるいはInputIteratorの操作以外で例外が発生した場合、副作用が発生しない。」
		- このため、コピーコンストラクタで例外が発生した場合が保証の範囲外となり、保証が弱まってしまっていた。
	- C++14では、上記文面を見直し、終端（`deque`の場合は両端）への単一要素の追加の場合に限りC++03と同等の強い保証を提供するよう修正された。
	- それに加えて、C++14ではこの強い保証を提供する関数を、以下のように拡大した：
		- `vector`の`push_back()` (C++03から)
		- `vector`の[`emplace_back()`](./emplace_back.md) (C++14から)
		- `vector`の終端へ単一要素を挿入する[`insert()`](./insert.md)と[`emplace()`](./emplace.md) (C++14から)
		- `deque`の[`push_back()`](/reference/deque/push_back.md)と[`push_front()`](/reference/deque/push_front.md) (C++03から)
		- `deque`の[`emplace_back()`](/reference/deque/emplace_back.md)と[`emplace_front()`](/reference/deque/emplace_front.md) (C++14から)
		- `deque`の両端へ単一要素を挿入する[`insert()`](/reference/deque/insert.md)と[`emplace()`](/reference/deque/emplace.md) (C++14)

