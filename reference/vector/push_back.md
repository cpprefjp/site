#push_back
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
void push_back(const T& x);

// C++11から
void push_back(T&& x);
```

##概要
新たな要素を末尾に追加する。


##戻り値
なし


##計算量
定数時間


##備考
- 要素を追加した後の[`size()`](./size.md)が要素を追加する前の[`capacity()`](./capacity.md)よりも大きい場合は領域の再確保が生じる。領域の再確保が生じなかった場合には全てのイテレーターや参照は有効である。
- 要素型`T`のコピーコンストラクタ、ムーブコンストラクタ、代入演算子、ムーブ代入以外で例外が発生した場合、副作用は発生しない。非CopyInsertableな型`T`のムーブコンストラクタで例外が発生した場合、副作用は未規定。


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
- [LWG Issue 2252. Strong guarantee on `vector::push_back()` still broken with C++11?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2252)
	- C++03では、「`vector`の`push_back()`、`deque`の`push_back()`と`push_front()`で例外が発生した場合、副作用が発生しない」という強い保証があった。
	- C++11では、`noexcept`を考慮して文面が見直されたが、その際に、以下のような仕様となった：
		- 「(挿入操作において、)要素型 T のコピーコンストラクタ、ムーブコンストラクタ、コピー代入演算子、ムーブ代入演算子、あるいはInputIteratorの操作以外で例外が発生した場合、副作用が発生しない。**列挙された操作で例外が発生した場合の動作は未規定**。」
		- この最後の一文が追加されたことにより、要素型`T`のコピー操作やムーブ操作で例外が発生した場合に未規定の動作となってしまい、仕様が壊れていた。
	- C++14では、上記文面を見直し、「要素型`T`のコピーコンストラクタ、ムーブコンストラクタ、代入演算子、ムーブ代入、InputIteratorへの操作以外で例外が発生した場合、副作用は発生しない。」とした。
	- それに加えて、C++14ではこの仕様の対象となる関数を、以下のように拡大した：
		- `vector`の`push_back()` (C++03から)
		- `vector`の[`emplace_back()`](./emplace_back.md) (C++14から)
		- `vector`の末尾へ単一要素を挿入する[`insert()`](./insert.md)と[`emplace()`](./emplace.md) (C++14から)
		- `deque`の[`push_back()`](/reference/deque/push_back.md)と[`push_front()`](/reference/deque/push_front.md) (C++03から)
		- `deque`の[`emplace_back()`](/reference/deque/emplace_back.md)と[`emplace_front()`](/reference/deque/emplace_front.md) (C++14から)
		- `deque`の両端へ単一要素を挿入する[`insert()`](/reference/deque/insert.md)と[`emplace()`](/reference/deque/emplace.md) (C++14)

