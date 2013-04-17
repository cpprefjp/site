#get_id
```cpp
id get_id() const noexcept;
```
* id[link /reference/thread/thread/id.md]

##概要

関連付けられているスレッドのスレッド識別子を取得する。


##戻り値

`thread`オブジェクトがスレッドに関連付けられている場合は、そのスレッドのスレッド識別子。そうでなければデフォルトコンストラクトされた[`thread::id`](/reference/thread/thread/id.md)オブジェクト。


##例外

送出しない。


##備考

<span>
</span>


##例

```cpp
#include <thread>

int main()
{
  std::thread th0;  assert( th0.get_id() == std::thread::id() );  std::thread th1([]{ /*...*/ });  assert( th1.get_id() != std::thread::id() );  th1.join();  return 0;
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