#get_id
```cpp
namespace std {

namespace this_thread {

  thread::id get_id() noexcept;
```
* thread::id[link /reference/thread/thread/id.md]

}}




##概要

現スレッドのスレッド識別子を取得する。


##戻り値

現在のスレッド、すなわちこの関数を呼び出したスレッドのスレッド識別子。戻り値はデフォルトコンストラクトされた[`thread::id`](/reference/thread/thread/id.md)オブジェクトとは必ず異なる。


##例外

送出しない。


##備考

<span>
</span>


##例

```cpp
#include <iostream>#include <thread>

int main()
{  std::cout << "thread_id=" << std::this_thread::get_id() << std::endl;
  return 0;
}
```

###出力

```cpp
thread_id=538af0
```

##バージョン


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